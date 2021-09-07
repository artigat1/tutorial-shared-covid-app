import ComponentController from '../../../node_modules/neo.mjs/src/controller/Component.mjs'
import NeoArray            from '../../../node_modules/neo.mjs/src/util/Array.mjs';

import Util from '../Util.mjs'

const apiSummaryUrl = 'https://disease.sh/v3/covid-19/all';

/**
 * @class Covid.view.MainContainerController
 * @extends Neo.controller.Component
 */
class MainContainerController extends ComponentController {
    static getConfig() {
        return {
            /**
             * @member {String} className='Covid.view.MainContainerController'
             * @private
             */
            className: 'Covid.view.MainContainerController',
            /**
             * @member {String} apiSummaryUrl='https://corona.lmao.ninja/v2/all'
             */
            apiSummaryUrl: 'https://corona.lmao.ninja/v2/all',

            /**
             * @member {String} apiUrl='https://disease.sh/v2/countries'
             */
            apiUrl: 'https://disease.sh/v2/countries',
            /**
             * @member {Object[]|null} data=null
             */
            data: null
        }
    }
    
    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        this.loadData();
        this.loadSummaryData();
    }

    /**
     *
     * @param {Object[]} data
     */
    addStoreItems(data) {
        const me        = this,
            activeTab = me.getReference('table-container');

        data.forEach(item => {
            if (item.country.includes('"')) {
                item.country = item.country.replace('"', "\'");
            }

            item.casesPerOneMillion = item.casesPerOneMillion > item.cases ? 'N/A' : item.casesPerOneMillion || 0;
            item.infected           = item.casesPerOneMillion;
        });

        me.data = data;

        activeTab.store.data = data;
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.active
     * @param {Number} data.cases
     * @param {Number} data.deaths
     * @param {Number} data.recovered
     * @param {Number} data.updated // timestamp
     */
    applySummaryData(data) {
        let me        = this,
            container = me.getReference('total-stats'),
            vdom      = container.vdom;

        me.summaryData = data;

        vdom.cn[0].cn[1].html = Util.formatNumber({value: data.cases});
        vdom.cn[1].cn[1].html = Util.formatNumber({value: data.active});
        vdom.cn[2].cn[1].html = Util.formatNumber({value: data.recovered});
        vdom.cn[3].cn[1].html = Util.formatNumber({value: data.deaths});

        container.vdom = vdom;

        container = me.getReference('last-update');
        vdom      = container.vdom;

        vdom.html = 'Last Update: ' + new Intl.DateTimeFormat('default', {
            hour  : 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date(data.updated));

        container.vdom = vdom;
    }

    /**
     *
     */
    loadData() {
        const me = this;

        fetch(me.apiUrl)
            .then(response => response.json())
            .then(data => me.addStoreItems(data))
            .catch(err => console.log('Can’t access ' + me.apiUrl, err));
    }

    /**
     *
     */
    loadSummaryData() {
        fetch(apiSummaryUrl)
            .then(response => response.json())
            .catch(err => console.log('Can’t access ' + apiSummaryUrl, err))
            .then(data => this.applySummaryData(data));
    }

    /**
     * @param {Object} data
     */
    onReloadDataButtonClick(data) {
        this.loadSummaryData();
    }

    /**
     * @param {Object} data
     */
    onSwitchThemeButtonClick(data) {
        let me       = this,
            button   = data.component,
            logo     = me.getReference('logo'),
            logoPath = 'https://raw.githubusercontent.com/neomjs/pages/master/resources/images/apps/covid/',
            vdom     = logo.vdom,
            view     = me.component,
            buttonText, cls, iconCls, theme;

        if (button.text === 'Theme Light') {
            buttonText = 'Theme Dark';
            iconCls    = 'fa fa-moon';
            theme      = 'neo-theme-light';
        } else {
            buttonText = 'Theme Light';
            iconCls    = 'fa fa-sun';
            theme      = 'neo-theme-dark';
        }

        vdom.src = logoPath + (theme === 'neo-theme-dark' ? 'covid_logo_dark.jpg' : 'covid_logo_light.jpg');
        logo.vdom = vdom;

        button.set({
            iconCls: iconCls,
            text   : buttonText
        });

        cls = [...view.cls];

        view.cls.forEach(item => {
            if (item.includes('neo-theme')) {
                NeoArray.remove(cls, item);
            }
        });

        NeoArray.add(cls, theme);
        view.cls = cls;

        button.set({
            iconCls: iconCls,
            text   : buttonText
        });
    }

    /**
     * @param {Object} data
     */
    onRemoveFooterButtonClick(data) {
        this.component.remove(this.getReference('footer'), true);
    }
}

Neo.applyClassConfig(MainContainerController)

export { MainContainerController as default }