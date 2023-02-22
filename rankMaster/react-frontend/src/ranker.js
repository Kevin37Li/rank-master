import React, { useEffect } from 'react';
import {list_of_lists} from "./lists";

let curr_list = [];

let getList = (id) => {
    let list = list_of_lists.find(x => x.id === id);
    if (typeof list === 'undefined') {
        console.log("No such list");
        return [];
    }
    return list.items;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

class Ranker extends React.Component {
    constructor(props) {
        super(props);

        let id = Number(window.location.pathname.split('/').at(-1));

        curr_list = shuffle(getList(id));

        this.state = {
            started: false,
            ended: false,
            // the list queue; lists follow the format of [[the list, minimum rank of this list],...]
            lists: [[curr_list, 0]],
            // currently all undefined
            final_arr: Array.apply(null, Array(curr_list.length)).map(function () {}),
        };
    }

    resetList = () => {
        this.setState({
            started: false,
            ended: false,
            // the list queue; lists follow the format of [[the list, minimum rank of this list],...]
            lists: [[curr_list, 0]],
            // currently all undefined
            final_arr: Array.apply(null, Array(curr_list.length)).map(function () {}),
        });
    }

    changeItems = () => {
        // get all the comparisons still active
        let pairs = this.state.comparisons;
        // console.log(this.state.comparisons);

        //if there are no more comparisons, we are done with this pivot
        if (pairs.length === 0) {
            console.log('empty!');
            console.log('pivot: ', this.state.pivot, ' , lower: ', this.state.lower, ', upper: ', this.state.higher)
            // we know where the pivot is in the final order now
            let arr = this.state.final_arr;
            let pivot_pos = this.state.lower.length + this.state.min;
            arr[pivot_pos] = this.state.pivot;
            // if the lower or upper set only has 1 item left, also know where that item would be on the final ranking too
            let low_len = this.state.lower.length;
            let high_len = this.state.higher.length;
            if (low_len === 1) {
                arr[this.state.min] = this.state.lower[0];
            }
            if (high_len === 1) {
                arr[pivot_pos + 1] = this.state.higher[0];
            }
            // add lower & upper to the list queue, along with the mins
            // if neither needs more comparisons, just update the final ranking & go to startClick to work on the next list in the queue
            if (low_len <= 1 && high_len <= 1) {
                this.setState({ final_arr: arr}, this.startClick);
            } else if (low_len <= 1) {
                // lower doesn't need more comparisons, so just add higher
                let add_arr = [[this.state.higher, pivot_pos + 1]];
                this.setState({
                    final_arr: arr,
                    lists: [...this.state.lists, ...add_arr],
                }, this.startClick)
            } else if (high_len <= 1) {
                // higher doesn't need more comparisons, so just add lower
                let add_arr = [[this.state.lower, this.state.min]];
                this.setState({
                    final_arr: arr,
                    lists: [...this.state.lists, ...add_arr],
                }, this.startClick)
            } else {
                // add both higher & lower to the queue
                let add_arr = [[this.state.lower, this.state.min], [this.state.higher, pivot_pos + 1]];
                this.setState({
                    final_arr: arr,
                    lists: [...this.state.lists, ...add_arr],
                }, this.startClick)
            }
        } else {
            // change itemA & itemB based on the comparisons that still need to happen
            // once we add a comparison, remove that from future consideration
            this.setState({
                started: true,
                itemA: pairs[0][0],
                itemB: pairs[0][1],
                // pivot: pairs[0][0],
                comparisons: pairs.slice(1),
            })
        }
    }

    handleClick = (button) => {
        // console.log('before: ', this.state);

        if (button === 'button-A') {
            // A is pivot, so if A is chosen then add B to the lower list
            // change so that the button display a new comparison
            // console.log(this.state.itemA, ' is selected');
            this.setState({ lower: [...this.state.lower, this.state.itemB] }, this.changeItems)
        } else {
            // A is pivot, so if B is chosen then add B to the upper list
            // change so that the button display a new comparison
            // console.log(this.state.itemB, ' is selected');
            this.setState({ higher: [...this.state.higher, this.state.itemB] }, this.changeItems)
        }

        // this.changeItems();
    }

    startClick = () => {
        // console.log(this.state.final_arr);
        // console.log('lists', this.state.lists.length);

        // if there are no more items in the list queue, we are done ranking
        if (this.state.lists.length === 0){
            console.log('All done!');
            console.log('Final list: ', this.state.final_arr);
            this.setState({
                ended: true,
            })
            return;
        }

        // extract the first list in the list queue
        let curr_list = this.state.lists[0][0];
        let curr_min = this.state.lists[0][1];

        // get all the possible comparisons in this list against the pivot (first item in list)
        let pairs = [];
        let pivot = curr_list[0];
        for (let i = 1; i < curr_list.length; i++) {
            pairs.push([curr_list[0], curr_list[i]]);
        }
        // console.log(pairs);

        // take this first list we are operating on off the list queue
        // console.log('old list', this.state.lists);
        let new_lists = this.state.lists.slice(1);
        // console.log('new list', new_lists);

        // reset the higher & lower lists for this queue
        // save the pivot, curr min & the comparisons
        // since we haven't actually changed what the buttons are yet, go to changeItems after the state is set
        this.setState({
            started: true,
            lower: [],
            higher: [],
            lists: new_lists,
            pivot: pivot,
            min: curr_min,
            comparisons: pairs,
        }, this.changeItems);
    }

    render() {
        // if the process ended, say you are done & list them in the right order
        if (this.state.ended) {
            const listItems = this.state.final_arr.reverse().map(item => <li>{item}</li>);
            return (
                <div>
                    <h1>Finished!</h1>
                    <ol>{listItems}</ol>
                    <button onClick={() => this.resetList()}>RESET</button>
                </div>
            )
        } if (!this.state.started) {
            // start the process by pressing "START"
            return <button onClick={() => this.startClick()}>START</button>
        } else {
            // during the process, change the name of the buttons
            return (
                <div>
                    <h1>Choose the better item!</h1>
                    <button onClick={() => this.handleClick("button-A")}>{this.state.itemA}</button>
                    <button onClick={() => this.handleClick("button-B")}>{this.state.itemB}</button>
                </div>
            )
        }
    }
}

export default Ranker;
