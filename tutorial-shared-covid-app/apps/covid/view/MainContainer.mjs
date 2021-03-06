import Viewport from '../../../node_modules/neo.mjs/src/container/Viewport.mjs'
import { default as TabContainer } from '../../../node_modules/neo.mjs/src/tab/Container.mjs'

import CountryTable from './country/Table.mjs'
import FooterContainer from './FooterContainer.mjs'
import GalleryContainer          from './GalleryContainer.mjs';
import HeaderContainer from './HeaderContainer.mjs'
import HelixContainer from './HelixContainer.mjs'
import MainContainerController from './MainContainerController.mjs'

/**
 * @class Covid.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends Viewport {
    static getConfig() {
        return {
            className: 'Covid.view.MainContainer',
            autoMount: true,
            controller: MainContainerController,
            layout: {
                ntype: 'vbox',
                align: 'stretch'
            },

            itemDefaults: {
                ntype: 'component'
            },

            items: [
                {
                    module: HeaderContainer,
                    height: 120
                },
                {
                    module: TabContainer,
                    flex: 1,
                    reference: 'tab-container',
                    style: {
                        margin: '10px',
                        marginTop: 0
                    },

                    items: [{
                        module: CountryTable,
                        reference: 'table',

                        tabButtonConfig: {
                            iconCls: 'fa fa-table',
                            route: 'mainview=table',
                            text: 'Table'
                        }
                    }, {
                        module: HelixContainer,

                        tabButtonConfig: {
                            iconCls: 'fa fa-dna',
                            route: 'mainview=helix',
                            text: 'Helix'
                        }
                    }, {
                        module         : GalleryContainer,
                        tabButtonConfig: {
                            iconCls: 'fa fa-images',
                            route  : 'mainview=gallery',
                            text   : 'Gallery'
                        }
                    }]
                },
                FooterContainer,
            ]
        }
    }
}

Neo.applyClassConfig(MainContainer)

export { MainContainer as default }