/**
 * Serviço que centraliza configurações e chamadas a janelas de diálogo
 */
class DialogService {

    /**
     * @constructor
     *
     * @param {Object} $mdDialog - serviço $mdDialog do angular-material
     *
     * @returns {void}
     */
    constructor( $mdDialog ) {
        this.$mdDialog = $mdDialog;
        this.defaultOptions = {
            confirm: {
                ok: 'Confirmar',
                cancel: 'Fechar'
            },
            alert: {
                ok: 'Fechar',
                clickOutsideToClose: true
            }
        };
    }

    /**
     * Exibe janela do tipo 'alert'
     *
     * @param {Object} contextualOptions -  opções fornecidas no contexto da chamada ao dialog
     *
     * @returns {Promise} - uma promise
     */
    alert( contextualOptions ) {
        let opts = this._buildOptionsTo( 'alert', contextualOptions );

        var confirm = this.$mdDialog.alert()
                          .clickOutsideToClose( opts.clickOutsideToClose )
                          .title( opts.title )
                          .textContent( opts.content )
                          .targetEvent( opts.targetEvent )
                          .ok( opts.ok );
        return this.$mdDialog.show( confirm );
    }

    /**
     * Exibe janela do tipo 'confirm'
     *
     * @param {Object} contextualOptions -  opções fornecidas no contexto da chamada ao dialog
     *
     * @returns {Promise} - uma promise
     */
    confirm( contextualOptions ) {
        let opts = this._buildOptionsTo( 'confirm', contextualOptions );

        var confirm = this.$mdDialog.confirm()
                          .title( opts.title )
                          .textContent( opts.content )
                          .targetEvent( opts.targetEvent )
                          .ok( opts.ok )
                          .cancel( opts.cancel );
        return this.$mdDialog.show( confirm );
    }

    /**
     * Cancela a janela de diálogo aberta
     *
     * @returns {void}
     */
    cancel() {
        this.$mdDialog.cancel();
    }

    /**
     * Fecha a janela de diálogo aberta
     *
     * @returns {void}
     */
    ok() {
        this.$mdDialog.hide();
    }

    /**
     * Monta um objeto de configuração para o dialog usando as configurações
     * default + as opções passadas no contexto da chamada ao dialog
     *
     * @param {string} dialogTypeName - o tipo de janela sendo exibida ( 'alert', 'confirm' )
     * @param {Object} contextualOptions - opções fornecidas no contexto da chamada ao dialog
     *
     * @returns {Object} - um objeto de configuração para o dialog
     *
     * @private
     */
    _buildOptionsTo( dialogTypeName, contextualOptions ) {
        return angular.merge( {}, this.defaultOptions[ dialogTypeName ], contextualOptions );
    }

}

export default [
    '$mdDialog', DialogService
];
