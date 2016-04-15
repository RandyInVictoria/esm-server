'use strict';
// =========================================================================
//
// Routes for roles
//
// =========================================================================
var policy     = require ('../policies/role.policy');
var controller = require ('../controllers/role.controller');
var path       = require('path');
var helpers    = require (path.resolve('./modules/core/server/controllers/core.helpers.controller'));
var Invitation = require (path.resolve('./modules/invitations/server/controllers/invitation.controller'));

module.exports = function (app) {
	app.route ('/api/role').all (policy.isAllowed)
		.post (function (req, res) {
			controller.newRole ()
			.then (function (role) {
				role.set (req.body);
				return role.save ();
			})
			.then (helpers.success(res), helpers.failure(res));
		});
	app.route ('/api/new/role').all (policy.isAllowed)
		.get (function (req, res) {
			controller.newRole ()
			.then (helpers.success(res), helpers.failure(res));
		});
	app.route ('/api/role/:role').all (policy.isAllowed)
		.put (function (req, res) {
			controller.getRole (req.params.role)
        .then(function(role) {
          // this is where we do user/role manipulation
          // including adding and removing the invitee role (and invitations) as needed
          return (new Invitation(req.user)).handleInvitations(req, role, req.body.users);
        })
			.then (function (data) {
				data.role.set ({users: data.users});
				return data.role.save ();
			})
			.then (helpers.success(res), helpers.failure(res));
		})
		.get (function (req, res) {
			// console.log(req.params.role);
			controller.getRole (req.params.role)
			.then (helpers.success(res), helpers.failure(res));
		});

  app.route ('/api/role/:role/project/:project').all (policy.isAllowed)
    .put (function (req, res) {
      var role;
      controller.getRole (req.params.role)
        .then(function(r) {
          role = r;
          // call into Invitations controller, let it determine which users need an invitation and which users are to be added to the role...
          return Invitation.createInvitations(req.Project, role, req.body.users, req.user);
        })
        .then (function (users) {
          // this will add users to the role...
          role.set ({users: users});
          return role.save ();
        })
        .then (helpers.success(res), helpers.failure(res));
    });	
  //
	// get all users in a role
	//
	app.route ('/api/users/in/role/:role').all (policy.isAllowed)
		.get (function (req, res) {
			controller.getUsersForRole (req.params.role)
			.then (helpers.success(res), helpers.failure(res));
		});
	//
	// get all roles in a project
	//
	app.route ('/api/roles/project/:project').all (policy.isAllowed)
		.get (function (req, res) {
			controller.getRolesInProject (req.Project)
			.then (helpers.success(res), helpers.failure(res));
		});
	//
	// get all users in all roles for a project
	//
	app.route ('/api/users/roles/project/:project').all (policy.isAllowed)
		.get (function (req, res) {
			controller.getUsersInRolesInProject (req.Project)
			.then (helpers.success(res), helpers.failure(res));
		});
	//
	// get all projects with a role
	//
	app.route ('/api/projects/with/role/:role').all (policy.isAllowed)
		.get (function (req, res) {
			controller.getProjectsWithRole (req.params.role)
			.then (helpers.success(res), helpers.failure(res));
		});
	//
	// get system roles only
	//
	app.route ('/api/system/roles').all (policy.isAllowed)
		.get (function (req, res) {
			controller.getSystemRoles ()
			.then (helpers.success(res), helpers.failure(res));
		});
};

