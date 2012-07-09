(function ( $, undefined ) {
    $.widget( "dck.scroller", {
        // default options
        options:{
            direction:'vertical',
            rate:40,
            seamless:true
        },
        _create:function () {
			this._INNER_SCROLLER_CLASS = '.inner-scroller';
            this._INNER_SCROLLER_DUP_CLASS = '.inner-scroller-duplicate';
            var el = this.element,
                o = this.options;
            el.css( 'position', 'relative' );
            var div = (this.div = $( '<div />' ))
                    .addClass( this._INNER_SCROLLER_CLASS.substring(1) ).css( { 'position':'absolute', 'top':0} );
            div = el.children().wrapAll( div ).parent();
            var div2 = (this.div2 = div.clone())
                    .removeClass()
                    .addClass( this._INNER_SCROLLER_DUP_CLASS.substring(1) )
                    .appendTo( el ).css( 'top', el.height() );
            this._bindEvents();
            if ( o.direction === 'vertical' ) {
                this._scrollVertically( this._INNER_SCROLLER_CLASS, this._INNER_SCROLLER_DUP_CLASS );
            } else {
				this._scrollHorizontally();
            }
        },
        _init:function () {
        },
        // binds events
        _bindEvents:function () {
            var self = this,
                el = this.element;
            el.on( 'mouseenter', function () {
                el.children().stop();
            } );
            el.on( 'mouseleave', function () {
                var div1 = el.find( self._INNER_SCROLLER_CLASS ),
                    div2 = el.find( self._INNER_SCROLLER_DUP_CLASS );
                if ( parseFloat( div1.css( 'top' )) < parseFloat( div2.css( 'top' )) ) {
                    self._scrollVertically( self._INNER_SCROLLER_CLASS, self._INNER_SCROLLER_DUP_CLASS );
                } else {
					self._scrollVertically(self._INNER_SCROLLER_DUP_CLASS , self._INNER_SCROLLER_CLASS );
                }
            } );
        },
        _scrollVertically:function ( myClass, myClass2 ) {
            var self = this,
                el = this.element,
                set = false,
                inner = el.find( myClass );
            inner.animate( {
                    top:-inner.height()
                },
                {
                    easing:"linear",
                    duration:this._getDuration( myClass ),
                    step:function ( now, fx ) {
                        if ( set === false && parseFloat( inner.css( 'top' )) <
                            el.height() - inner.height() +
                                parseFloat( inner.children( ':last' ).css( 'margin-bottom' )) ) {
                            self._scrollVertically( myClass2, myClass );
                            set = true;
                        }
                    },
                    complete:function () {
                        inner.css( 'top', el.height() );
                    }
                } );
        },
        _scrollHorizontally:function () {
			 var self = this,
                el = this.element,
                set = false;
        },
        // react to option changes after initialization
        _setOption:function ( key, value ) {
            switch (key) {
                default:
                    break;
            }
            $.Widget.prototype._setOption.apply( this, arguments );
        },
        _getDuration:function ( myClass ) {
            var el = this.element,
                inner = el.find( myClass ),
                totalPixels = parseFloat( inner.css( 'top' )) + parseFloat( inner.height());
            return totalPixels / parseFloat( this.options.rate / 1000 );
        },
        destroy:function () {
            var el = this.element;
            // remove classes + data
            $.Widget.prototype.destroy.call( this );
            this.div2.children().prependTo( el ).remove();
            this.div.remove();
            return this;
        }
    } );
})( jQuery );
