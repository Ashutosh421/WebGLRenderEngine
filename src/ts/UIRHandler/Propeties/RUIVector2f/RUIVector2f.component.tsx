import * as React from 'react';

import { RNumberBox } from  '../RNumber/RNumber.component';

export interface RUIVector2fProps {
    label: string;
}

export interface RUIVector2fState {
    x: number;
    y: number;
}

export class RUIVector2f extends React.Component<RUIVector2fProps , RUIVector2fState> {

    constructor(props: RUIVector2fProps , state: RUIVector2fState) {
        super(props , state);
    }

    private onValueXChange = (value: number) => {
        this.setState((prevState , props) => {
            x: value;
        });
    }

    private onValueYChange = (value: number) => {
        this.setState((prevState , props) => {
            y: value;
        });
    }

    render () {
        return (
            <div>
                <span>{this.props.label}</span>
                <RNumberBox label = 'x' onValueUpdate = {this.onValueXChange}/>
                <RNumberBox label = 'y' onValueUpdate = {this.onValueYChange}/>
            </div>
        );
    }
}