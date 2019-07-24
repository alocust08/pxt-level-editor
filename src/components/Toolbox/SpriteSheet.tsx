import * as React from 'react';
import { loadImageAsync, ClientCoordinates } from '../../util';
import { TileSet } from '../../tileset';
import { Sprite } from '../SpriteStore';

interface SpriteSheetProps {
    Sprite: Sprite,
    finalSize?: number;
    selected: boolean;
}

interface SpriteSheetState {
    coords?: ClientCoordinates;
}

export default class SpriteSheet extends React.Component<SpriteSheetProps, SpriteSheetState> {
    private tileSet: TileSet;

    constructor(props: SpriteSheetProps) {
        super(props);
        this.state = {};

        this.loadTileSet = this.loadTileSet.bind(this);
        this.loadTileSet();
    }

    private loadTileSet() {
        const { image, height, index } = this.props.Sprite;

        loadImageAsync(image)
            .then((el) => {
                this.setState({ coords: new TileSet(el, height).indexToCoord(index) });
            });
    }

    public render() {
        const { image, name, index, height, width } = this.props.Sprite;
        const { coords } = this.state;

        return (
            <div style={{ overflow: 'visible', transform: `scale(${(this.props.finalSize / width)})`, transformOrigin: `0 0`, maxHeight: 0, }}>
                <img
                    alt={name || `tile-${index}`}
                    src={image}
                    style={{
                        border: this.props.selected ? "solid 1px #333" : "",
                        boxSizing: "border-box",
                        width: width,
                        height: height,
                        objectFit: 'none',
                        objectPosition: coords && `-${coords.clientX}px -${coords.clientY}px`,
                    }}
                />
            </div>
        );
    }
}