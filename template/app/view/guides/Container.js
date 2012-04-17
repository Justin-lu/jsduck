/**
 * The guide page.
 *
 * Renders the guide and print button.
 */
Ext.define('Docs.view.guides.Container', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.guidecontainer',
    componentCls: 'guide-container',

    initComponent: function() {
        this.addEvents(
            /**
             * @event
             * Fired after guide loaded.
             */
            'afterload'
        );
        this.callParent(arguments);
    },

    /**
     * Scrolls the specified element into view
     *
     * @param {String} id  ID of elemnt to scroll to.
     */
    scrollToEl: function(id) {
        var el = Ext.get(id);
        if (el) {
            var scrollOffset = el.getY() - 100;
            var currentScroll = this.getEl().getScroll()['top'];
            this.getEl().scrollTo('top', currentScroll + scrollOffset);
            el.highlight();
        }
    },

    /**
     * Scrolls guide to the top
     */
    scrollToTop: function() {
        this.body.scrollTo('top');
    },

    /**
     * Loads guide into the page.
     * @param {Object} guide
     */
    load: function(guide) {
        this.tpl = this.tpl || new Ext.XTemplate(
            Docs.data.showPrintButton ? '<a class="print guide" href="?print=/guide/{name}" target="_blank">Print</a>' : '',
            '{content}'
        );

        this.update(this.tpl.apply(guide));
        Docs.Syntax.highlight(this.getEl());

        this.fireEvent('afterload');
    }
});
