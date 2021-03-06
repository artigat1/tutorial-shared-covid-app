import {default as Container} from '../../../node_modules/neo.mjs/src/container/Base.mjs';

/**
 * @class Covid.view.FooterContainer
 * @extends Neo.container.Base
 */
class FooterContainer extends Container {
    static getConfig() {return {
        /**
         * @member {String} className='Covid.view.FooterContainer'
         * @private
         */
        className: 'Covid.view.FooterContainer',
        /**
         * @member {Number} height=20
         */
        height: 25,
        /**
         * @member {Object} layout={ntype: 'hbox'}
         */
        layout: {ntype: 'hbox'},
        /**
         * @member {String} reference='footer'
         */
        reference: 'footer',
        /**
         * @member {Object} itemDefaults
         */
        itemDefaults: {
            ntype: 'component',
            cls  : ['neo-link-color'],
            style: {fontSize: '13px', padding: '10px', paddingTop: 0}
        },
        /**
         * @member {Array} items
         */
        items: [{
            vdom: {
                cn: [{
                    vtype: 'text',
                    html : 'App created with '
                }, {
                    tag   : 'a',
                    href  : 'https://github.com/neomjs/neo',
                    html  : 'neo.mjs',
                    target: '_blank'
                }]
            }
        }, {
            flex: 1
        }, {
            html : 'Data provided by <a target="_blank" href="https://github.com/NovelCOVID/API">NovelCOVID/API</a>.'
        }, {
            flex: 1
        }, {
            html : ['Country Flag Icons made by <a target="_blank" href="https://www.flaticon.com/authors/freepik" ',
                'title="Freepik">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>.'
            ].join('')
        }, {
            ntype  : 'button',
            cls    : ['neo-button'],
            handler: 'onRemoveFooterButtonClick',
            height : 24,
            style  : {margin: 0, marginRight: '10px', marginTop: '-5px'},
            text   : 'Remove Footer'
        }]
    }}
}

Neo.applyClassConfig(FooterContainer);

export {FooterContainer as default};