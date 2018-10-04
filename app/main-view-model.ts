import { View, EventData } from "tns-core-modules/ui/core/view";
import { Observable } from 'data/observable';
import { Frame } from "tns-core-modules/ui/frame";
import { loadCss } from 'tns-core-modules/ui/styling/style-scope';

const newCss = "./new.css";

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value)
        }
    }

    public onTap(args: EventData) {
        const view = args.object as View;
        const page = view.page;

        this.refreshAppCss(page.frame);
    }

    private refreshAppCss(frame: Frame) {
        loadCss(newCss);
        frame._onCssStateChange();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        } else {
            this.message = `${this._counter} taps left`;
        }
    }
}
