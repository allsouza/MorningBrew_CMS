import React from 'react';
import Reorder, { reorder, reorderImmutable, reorderFromTo, reorderFromToImmutable } from 'react-reorder';

export default class StoriesOrder extends React.Component {
    constructor(props){
        super(props)
        this.state = {myList: props.stories}
    }

    componentDidUpdate(prevProps){
        if(prevProps.stories.length !== this.props.stories.length){
            this.setState({myList: this.props.stories})
        }
    }

    onReorder (event, previousIndex, nextIndex, fromId, toId) {
        const ordered = reorder(this.state.myList, previousIndex, nextIndex);
        this.setState({
            myList: ordered
        });
        this.props.save(ordered)
    }

    onReorderGroup (event, previousIndex, nextIndex, fromId, toId) {
        if (fromId === toId) {
            const list = reorderImmutable(this.state[fromId], previousIndex, nextIndex);

            this.setState({
            [fromId]: list
            });
        } else {
            const lists = reorderFromToImmutable({
            from: this.state[fromId],
            to: this.state[toId]
            }, previousIndex, nextIndex);

            this.setState({
            [fromId]: lists.from,
            [toId]: lists.to
            });
        }
    }
    
    render(){
        return(
            <div className="stories-order">
            <h2>Stories in this issue</h2>
            <p>Drag and drop stories in the order they will appear in the newsletter</p>
            <Reorder
                className="drag-n-drop"
                reorderId="stories-list" // Unique ID that is used internally to track this list (required)
                placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
                draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
                lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                touchHoldTime={500} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
                mouseHoldTime={0} // Hold time before dragging begins with mouse (optional), defaults to holdTime
                onReorder={this.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state)
                autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                disabled={false} // Disable reordering (optional), defaults to false
                disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
                >
                {this.state.myList.map( story => {
                    return(
                        <li key={story}>
                            {this.props.allStories[story].title}
                        </li>
                    )})
                }
            </Reorder> 
            </div>
        )

    }
}