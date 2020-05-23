
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { HeaderService } from 'src/app/services/header.service';

@Directive({
    selector: '[animateHeader]',
    exportAs: 'animateHeader'
})
export class HideHeaderDirective implements OnInit {

    @Input() content: any;
    @Input() slides;
    @Input() searchBar;

    private readonly TOOLBAR_HEIGHT = 50;
    private readonly HALF_TOOLBAR_HEIGHT = 25;
    private readonly HEADER_HEIGHT = this.TOOLBAR_HEIGHT * 2;

    private body;
    private searchAnimationActive = false;

    private mainToolbarPos = 0;
    private bodyMarginTop = 100;

    private contentLastY = 0;


    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private domCtrl: DomController,
        private headerService: HeaderService
    ) { }

    ngOnInit(): void {
        this.body = this.element.nativeElement;

        this.domCtrl.write(() => {
            this.renderer.listen(this.content.el, 'ionScroll', (ev) => this.onScroll(ev));
        });

        this.headerService.onSearchToggle$().subscribe(isOpen => {
            this.searchAnimationActive = isOpen;
            this.onToggleSearchBar(isOpen);
        });
    }

    onScroll(ev) {
        if (this.searchAnimationActive) return;

        const contentNewY = Math.round(ev.detail.scrollTop);
        const pixelsScroll = this.contentLastY - contentNewY;
        this.contentLastY = contentNewY;

        if (pixelsScroll < 0 && this.mainToolbarPos > -50) {
            this.mainToolbarPos = this.changeToolbarPosition(pixelsScroll);
            this.bodyMarginTop = this.changeMarginTop(pixelsScroll);

            this.domCtrl.write(() => {
                this.renderer.setStyle(this.body, 'transform', `translateY(${this.mainToolbarPos}px)`);
                this.renderer.setStyle(this.slides.el, 'transform', `translateY(${this.mainToolbarPos}px)`);
            });
        } else if (pixelsScroll > 0 && this.mainToolbarPos < 0) {
            this.mainToolbarPos = this.changeToolbarPosition(pixelsScroll);
            this.bodyMarginTop = this.changeMarginTop(pixelsScroll);

            this.domCtrl.write(() => {
                this.renderer.setStyle(this.body, 'transform', `translateY(${this.mainToolbarPos}px)`);
                this.renderer.setStyle(this.slides.el, 'transform', `translateY(${this.mainToolbarPos}px)`);
            });
        }
    }

    onToggleSearchBar(isSearchOpen: boolean) {
        if (isSearchOpen) {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.body, 'transform', `translateY(${-this.TOOLBAR_HEIGHT}px)`);
                this.renderer.setStyle(this.slides.el, 'transform', `translateY(${-this.TOOLBAR_HEIGHT}px)`);
                this.renderer.setStyle(this.searchBar, 'transform', `translateY(${this.TOOLBAR_HEIGHT}px)`);
                this.renderer.setStyle(this.body, 'transition', 'transform .4s');
                this.renderer.setStyle(this.slides.el, 'transition', 'transform .4s');
                this.renderer.setStyle(this.searchBar, 'transition', 'transform .4s');
                this.mainToolbarPos = - this.TOOLBAR_HEIGHT;
            });
        } else {
            this.domCtrl.write(() => {
                const handler = () => {
                    this.body.removeEventListener('transitionend', handler);
                    this.renderer.setStyle(this.body, 'transition-property', 'none');
                    this.renderer.setStyle(this.slides.el, 'transition-property', 'none');
                    this.renderer.setStyle(this.searchBar, 'transition-property', 'none');
                };
                this.body.addEventListener('transitionend', handler);

                this.renderer.setStyle(this.body, 'transform', `translateY(0px)`);
                this.renderer.setStyle(this.slides.el, 'transform', `translateY(0px)`);
                this.renderer.setStyle(this.searchBar, 'transform', `translateY(0px)`);
                this.mainToolbarPos = 0;

                this.renderer.setStyle(this.body, 'transition', 'transform .4s');
                this.renderer.setStyle(this.slides.el, 'transition', 'transform .4s');
                this.renderer.setStyle(this.searchBar, 'transition', 'transform .4s');
            });
        }
    }

    onSlideChange() {
        this.openHeaderAndAnimate();
    }

    onTouchUpDownEnd() {
        if (this.mainToolbarPos === 0 || this.mainToolbarPos === - this.TOOLBAR_HEIGHT) return;
        if (this.mainToolbarPos < - this.HALF_TOOLBAR_HEIGHT) this.closeHeaderAndAnimate();
        if (this.mainToolbarPos >= - this.HALF_TOOLBAR_HEIGHT) this.openHeaderAndAnimate();
    }

    hideHeadersCompletelyAndAnimate() {
        const handler = () => {
            this.body.removeEventListener('transitionend', handler);
            this.renderer.setStyle(this.element.nativeElement, 'transition-property', 'none');
        };
        this.element.nativeElement.addEventListener('transitionend', handler);
        this.renderer.setStyle(this.element.nativeElement, 'transition', 'transform .4s');
        this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(-${this.HEADER_HEIGHT}px)`);
    }

    showHeadersCompletelyAndAnimate() {
        this.mainToolbarPos = 0;
        this.bodyMarginTop = 100;

        const handler = () => {
            this.body.removeEventListener('transitionend', handler);
            this.renderer.setStyle(this.element.nativeElement, 'transition-property', 'none');
        };
        this.element.nativeElement.addEventListener('transitionend', handler);
        this.renderer.setStyle(this.element.nativeElement, 'transition', 'transform .4s');
        this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0px)');
    }

    moveHeaderUp(px: number) {
        px = Math.round((px / 4) + this.mainToolbarPos);
        const pxMove = this.moveHeaderPositionUp(px);
        this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(${pxMove}px)`);
    }

    moveHeaderDown(px: number) {
        px = - this.HEADER_HEIGHT + Math.round(px / 4);
        const pxMove = this.moveHeaderPositionDown(px);
        this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(${pxMove}px)`);
    }

    private openHeaderAndAnimate() {
        if (this.mainToolbarPos === 0) return;


        this.mainToolbarPos = 0;
        this.bodyMarginTop = 100;

        const handler = () => {
            this.body.removeEventListener('transitionend', handler);
            this.renderer.setStyle(this.body, 'transition-property', 'none');
            this.renderer.setStyle(this.slides.el, 'transition-property', 'none');
        };
        this.body.addEventListener('transitionend', handler);

        this.renderer.setStyle(this.body, 'transition', 'transform .4s');
        this.renderer.setStyle(this.slides.el, 'transition', 'transform .4s');
        this.renderer.setStyle(this.body, 'transform', `translateY(${this.mainToolbarPos}px)`);
        this.renderer.setStyle(this.slides.el, 'transform', `translateY(${this.mainToolbarPos}px)`);
    }

    private closeHeaderAndAnimate() {
        if (this.mainToolbarPos === - this.TOOLBAR_HEIGHT) return;


        this.mainToolbarPos = - this.TOOLBAR_HEIGHT;
        this.bodyMarginTop = 50;

        const handler = () => {
            this.body.removeEventListener('transitionend', handler);
            this.renderer.setStyle(this.body, 'transition-property', 'none');
            this.renderer.setStyle(this.slides.el, 'transition-property', 'none');
        };
        this.body.addEventListener('transitionend', handler);

        this.renderer.setStyle(this.body, 'transition', 'transform .4s');
        this.renderer.setStyle(this.slides.el, 'transition', 'transform .4s');
        this.renderer.setStyle(this.body, 'transform', `translateY(${this.mainToolbarPos}px)`);
        this.renderer.setStyle(this.slides.el, 'transform', `translateY(${this.mainToolbarPos}px)`);
    }

    private moveHeaderPositionUp(px: number) {
        if (px > 0) return 0;
        if (px < -this.HEADER_HEIGHT) return -this.HEADER_HEIGHT;
        return px;
    }

    private moveHeaderPositionDown(px: number) {
        if (px > 0) return 0;
        if (px < -this.HEADER_HEIGHT) return -this.HEADER_HEIGHT;
        return px;
    }

    private changeToolbarPosition(px: number) {
        const res = px + this.mainToolbarPos;
        if (res > 0) return 0;
        if (res < -this.TOOLBAR_HEIGHT) return -this.TOOLBAR_HEIGHT;
        return res;
    }

    private changeMarginTop(px: number) {
        const res = px + this.bodyMarginTop;
        if (res < 50) return 50;
        if (res > 100) return 100;
        return res;
    }

}
