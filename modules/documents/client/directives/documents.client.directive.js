'use strict';

angular.module('documents')
  .directive('tmplDocumentsUploadGeneral', directiveDocumentsUploadGeneral)
  .directive('tmplDocumentsLink', directiveDocumentsLink)
  .directive('tmplDocumentsUploadClassifyMem', directiveDocumentsUploadClassifyMem)
  .directive('tmplDocumentsUploadClassify', directiveDocumentsUploadClassify)
  .directive('tmplDocumentsList', directiveDocumentsList)
  .directive('tmplDocumentsBrowser', directiveDocumentsBrowser)
  .directive('tmplDocumentsApprovals', directiveDocumentsApprovals)
  .directive('modalDocumentUploadReview', directiveModalDocumentUploadReview)
  .directive('modalDocumentLink', directiveModalDocumentLink)
  .directive('modalPdfViewer', directiveModalPdfViewer)
  .directive('modalDocumentUploadClassifyMem', directiveModalDocumentUploadClassifyMem)
  .directive('modalDocumentUploadClassify', directiveModalDocumentUploadClassify)
  .directive('modalDocumentInstructions', directiveModalDocumentInstructions);

// -----------------------------------------------------------------------------------
//
// CONTROLLER: Document Upload General
//
// -----------------------------------------------------------------------------------
function directiveDocumentsUploadGeneral() {

  var directive = {
    restrict: 'E',
    templateUrl: 'modules/documents/client/views/partials/document-upload-general.html',
    scope: {
      project: '=',
      artifact: '=',
      type: '@',
      hideUploadButton: '=',
      parentId: '=',
      docLocationCode: '='
    },
    controller: 'controllerDocumentUploadGlobal',
    controllerAs: 'docUpload'
  };

  return directive;
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Document Link General
//
// -----------------------------------------------------------------------------------
function directiveDocumentsLink() {
  var directive = {
    restrict: 'E',
    templateUrl: 'modules/documents/client/views/partials/document-link.html',
    scope: {
      project: '=',
      artifact: '=',
      type: '@', //project or comment
      current: '=',
      parentId: '=',
      docLocationCode: '=',
      documentsControl: '='
    },
    controller: 'controllerDocumentLinkGlobal',
    controllerAs: 'docLink'
  };

  return directive;
}

directiveModalPdfViewer.$inject = ['$uibModal'];
/* @ngInject */
function directiveModalPdfViewer($uibModal) {
  var directive = {
    restrict:'A',
    scope: {
      pdfobject: '='
    },
    link : function(scope, element) {
      element.on('click', function() {
        var modalDocView = $uibModal.open({
          resolve: {
            pdfobject: function() { return scope.pdfobject; }
          },
          templateUrl: 'modules/documents/client/views/partials/pdf-viewer.html',
          controller: 'controllerModalPdfViewer',
          controllerAs: 'pdfViewer',
          windowClass: 'document-viewer-modal'
        });
        modalDocView.result.then(function () {}, function () {});
      });
    }
  };
  return directive;
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Document Upload General for
//
// -----------------------------------------------------------------------------------
function directiveDocumentsUploadClassify() {
  var directive = {
    restrict: 'E',
    templateUrl: 'modules/documents/client/views/partials/document-upload-classify.html',
    scope: {
      project: '=',
      artifact: '=',
      type: '@', //project or comment
      hideUploadButton: '=',
      parentId: '=',
      docLocationCode: '=',
      documentsControl: '='
    },
    controller: 'controllerDocumentUploadGlobal',
    controllerAs: 'docUpload'
  };

  return directive;
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Document Upload General for MEM
//
// -----------------------------------------------------------------------------------
function directiveDocumentsUploadClassifyMem() {
  var directive = {
    restrict: 'E',
    templateUrl: 'modules/documents/client/views/partials/document-upload-classify-mem.html',
    scope: {
      project: '=',
      artifact: '=',
      type: '@', //project or comment
      hideUploadButton: '=',
      parentId: '=',
      docLocationCode: '='
    },
    controller: 'controllerDocumentUploadGlobal',
    controllerAs: 'docUpload'
  };

  return directive;
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Document List Table
//
// -----------------------------------------------------------------------------------
function directiveDocumentsList() {

  var directive = {
    restrict: 'E',
    templateUrl: 'modules/documents/client/views/partials/document-list.html',
    controller: 'controllerDocumentList',
    controllerAs: 'docList',
    scope: {
      documents: '=',
      project: '=',
      documentsObjs: '=',
      allowEdit: '@'
    }
  };

  return directive;
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Document Browser
//
// -----------------------------------------------------------------------------------
directiveDocumentsBrowser.$inject = ['$uibModal'];
/* @ngInject */
function directiveDocumentsBrowser() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/documents/client/views/partials/document-browser.html',
    controller: 'controllerDocumentBrowser',
    controllerAs: 'docBrowser',
    scope: {
      project: '=',
      artifact: '=',
      allowLink: '@',
      approvals: '@',
      docLocationCode: '@',
      documentsControl: '='
    }
  };

  return directive;
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Documents for Approval
//
// -----------------------------------------------------------------------------------
directiveDocumentsApprovals.$inject = ['$uibModal'];
/* @ngInject */
function directiveDocumentsApprovals() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/documents/client/views/partials/document-approvals.html',
    controller: 'controllerDocumentBrowser',
    controllerAs: 'docBrowser',
    scope: {
      project: '=',
      approvals: '@'
    }
  };

  return directive;
}


// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Modal document viewer
//
// -----------------------------------------------------------------------------------
directiveModalDocumentViewer.$inject = ['$uibModal'];
/* @ngInject */
function directiveModalDocumentViewer($uibModal) {
  var directive = {
    restrict:'A',
    link : function(scope, element) {
      element.on('click', function() {
        var modalDocView = $uibModal.open({
          animation: true,
          templateUrl: 'modules/documents/client/views/partials/modal_document_viewer.html',
          controller: 'controllerModalDocumentViewer',
          controllerAs: 'md',
          size: 'lg'
        });
        modalDocView.result.then(function () {}, function () {});
      });
    }
  };
  return directive;
}
// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Link in a modal
//
// -----------------------------------------------------------------------------------
directiveModalDocumentLink.$inject = ['$uibModal', '$rootScope'];
/* @ngInject */
function directiveModalDocumentLink($uibModal, $rootScope) {
  var directive = {
    restrict:'A',
    scope: {
      project: '=',
      artifact: '=',
      current: '=',
      docLocationCode: '=',
      documentsControl: '='
    },
    link : function(scope, element) {
      element.on('click', function() {
        var modalDocLink = $uibModal.open({
          animation: true,
          templateUrl: 'modules/documents/client/views/partials/modal-document-link.html',
          controller: 'controllerModalDocumentLink',
          controllerAs: 'docLinkModal',
          size: 'lg',
          resolve: {
            rProject: function() { return scope.project; },
            rArtifact: function() {
              return scope.artifact;
            },
            rCurrent: function() { return scope.current; },
            rDocLocationCode: function() {
              return scope.docLocationCode;
            },
            rDocumentsControl: function() {
              return scope.documentsControl;
            }
          }
        });
        modalDocLink.result.then(function (/* data */) {
          $rootScope.$broadcast('refreshDocumentList');
        }, function () {});
      });
    }
  };
  return directive;
} // -----------------------------------------------------------------------------------
//
// DIRECTIVE: Upload in a modal
//
// -----------------------------------------------------------------------------------
directiveModalDocumentUploadClassify.$inject = ['$uibModal', '$rootScope'];
/* @ngInject */
function directiveModalDocumentUploadClassify($uibModal, $rootScope) {
  var directive = {
    restrict:'A',
    scope: {
      project: '=',
      artifact: '=',
      docLocationCode: '=',
      documentsControl: '='
    },
    link : function(scope, element) {
      element.on('click', function() {
        var modalDocUpload = $uibModal.open({
          animation: true,
          templateUrl: 'modules/documents/client/views/partials/modal-document-upload-classify.html',
          controller: 'controllerModalDocumentUploadClassify',
          controllerAs: 'docUploadModal',
          size: 'lg',
          resolve: {
            rProject: function() { return scope.project; },
            rArtifact: function() {
              return scope.artifact;
            },
            rDocLocationCode: function() {
              return scope.docLocationCode;
            },
            rDocumentsControl: function() {
              return scope.documentsControl;
            }
          }
        });
        modalDocUpload.result.then(function (/* data */) {
          $rootScope.$broadcast('refreshDocumentList');
        }, function () {});
      });
    }
  };
  return directive;
}
// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Upload in a modal
//
// -----------------------------------------------------------------------------------
directiveModalDocumentUploadClassifyMem.$inject = ['$uibModal', '$rootScope'];
/* @ngInject */
function directiveModalDocumentUploadClassifyMem($uibModal, $rootScope) {
  var directive = {
    restrict:'A',
    scope: {
      project: '='
    },
    link : function(scope, element) {
      element.on('click', function() {
        var modalDocUpload = $uibModal.open({
          animation: true,
          templateUrl: 'modules/documents/client/views/partials/modal-document-upload-classify-mem.html',
          controller: 'controllerModalDocumentUploadClassify',
          controllerAs: 'docUploadModal',
          size: 'lg',
          resolve: {
            rProject: function() { return scope.project; }
          }
        });
        modalDocUpload.result.then(function (/* data */) {
          $rootScope.$broadcast('refreshDocumentList');
        }, function () {});
      });
    }
  };
  return directive;
}
// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Upload in a modal
//
// -----------------------------------------------------------------------------------
directiveModalDocumentUploadReview.$inject = ['$uibModal', '$rootScope'];
/* @ngInject */
function directiveModalDocumentUploadReview($uibModal, $rootScope) {
  var directive = {
    restrict:'A',
    scope: {
      project: '='
    },
    link : function(scope, element) {
      element.on('click', function() {
        var modalDocUpload = $uibModal.open({
          animation: true,
          templateUrl: 'modules/documents/client/views/partials/modal-document-upload-review.html',
          controller: 'controllerModalDocumentUploadReview',
          controllerAs: 'docUploadModalReview',
          size: 'lg',
          resolve: {
            rProject: function() { return scope.project; }
          }
        });
        modalDocUpload.result.then(function (/* data */) {
          $rootScope.$broadcast('refreshDocumentList');
        }, function () {});
      });
    }
  };
  return directive;
}

// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Display instructions for user
//
// -----------------------------------------------------------------------------------
directiveModalDocumentInstructions.$inject = ['$uibModal'];
/* @ngInject */
function directiveModalDocumentInstructions($uibModal) {
  var directive = {
    restrict:'A',
    scope: {
      project: '='
    },
    link : function(scope, element) {
      element.on('click', function() {
        var modalDocInstructions = $uibModal.open({
          animation: true,
          templateUrl: 'modules/documents/client/views/partials/modal-document-instructions.html',
          controller: 'controllerModalDocumentInstructions',
          controllerAs: 'instruct',
          size: 'lg'
        });
        modalDocInstructions.result.then(function (/* data */) {
          // do nothing for the fulfilled promise
        }, function () {
          // do nothing for the rejected promise
        });
      });
    }
  };
  return directive;
}
