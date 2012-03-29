/**
 * Main content area of the app.
 *
 * Also contains toolbar with side navigation toggling button and
 * search field.
 */
Ext.define('TouchDocs.view.Content', {
    extend: 'Ext.Container',
    xtype: 'content',

    config: {
        id: 'center-container',

        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'Welcome',
                items: [
                    {
                        iconCls: 'list',
                        iconMask: true,
                        action: 'toggleNavigation'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Search',
                        width: 170
                    }
                ]
            }
        ],

        scrollable: 'vertical'
    },

    initialize: function() {
        this.callParent();

        this.element.addListener('tap', function(cmp, el) {
            Ext.get(el).up('.member').toggleCls('open');
        }, this, {
            preventDefault: true,
            delegate: '.expandable'
        });

        // Do nothing when clicking on not-expandable items
        this.element.addListener('click', Ext.emptyFn, this, {
            preventDefault: true,
            delegate: '.not-expandable'
        });

        this.down('toolbar').down('title').element.addListener('tap', function() {
            this.scrollToTop(true);
        }, this);
    },

    /**
     * Loads the initial welcome page.
     */
    loadHome: function() {
        this.setTitle("Welcome");
        this.setHtml(document.getElementById('welcome-content').innerHTML);
        this.scrollToTop();
    },

    /**
     * Loads class documentation.
     * @param {String} name Class name
     * @param {String} content HTML documentation
     */
    loadClass: function(name, content) {
        this.setTitle(name);
        this.setHtml('<div class="class-overview">' + content + '</div>');
        this.scrollToTop();
    },

    /**
     * Loads guide.
     * @param {String} name Guide name
     * @param {String} content HTML documentation
     */
    loadGuide: function(name, content) {
        this.setTitle(name);
        this.setHtml('<div class="guide-container">' + content + '</div>');
        this.scrollToTop();
    },

    /**
     * Loads video.
     * @param {String} name Video name
     * @param {String} videoId Vimeo video ID.
     * @param {String} description Video description
     */
    loadVideo: function(name, videoId, description) {
        this.setTitle(name);
        this.setHtml([
            '<div class="guide-container">',
                '<iframe src="http://player.vimeo.com/video/' + videoId + '" width="640" height="480" frameborder="0"></iframe>',
                '<p>' + description + '</p>',
            '</div>'
        ].join(''));
        this.scrollToTop();
    },

    /**
     * Sets the title of toolbar.
     * @param {String} title
     */
    setTitle: function(title) {
        this.down("toolbar").setTitle(title);
    },

    /**
     * Scrolls content to top.
     * @param {Boolean} [animate=false] True to animate the scrolling.
     */
    scrollToTop: function(animate) {
        this.getScrollable().getScroller().scrollTo(0, 0, animate);
    }

});
