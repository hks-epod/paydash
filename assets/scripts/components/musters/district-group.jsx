'use strict';

import React from 'react';
import DistrictCard from './district-card.jsx';
import Sort from './sort.jsx';

const BlockGroup = React.createClass({
    filterCards: function(event) {
        var updatedList = this.props.data.cards;
        updatedList = updatedList.filter(function(item) {
            var match = false;

            if (item.block_name.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {
                match = true;
            }

            item.officers.forEach(function(officer) {
                if (officer.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {
                    match = true;
                }
            });

            return match;
        });
        this.setState({ cards: updatedList });
    },
    sortBy(field) {
        var updatedList = this.props.data.cards.slice(0);

        updatedList.sort(function(a, b) {
            if (typeof a[field] === 'number') {
                if (a[field] > b[field]) {
                    return -1;
                } else if (a[field] < b[field]) {
                    return 1;
                } else {
                    return 0;
                }
            } else if (typeof a[field] === 'string') {
                if (a[field].toLowerCase() > b[field].toLowerCase()) {
                    return 1;
                } else if (a[field].toLowerCase() < b[field].toLowerCase()) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });

        this.setState({ cards: updatedList });
    },
    getInitialState: function() {
        return {
            cards: []
        };
    },
    componentWillMount: function() {
        this.setState({ cards: this.props.data.cards });
    },
    render: function() {
        var _this = this;
        var sortList = ['block_name', 'current_total', 'delayed_total', 'days_to_payment'];

        return (
            <div>
                <div className="group-head">
                    <input
                        className="search-bar u-pull-right"
                        type="text"
                        placeholder={_this.props.translation.search_placeholder}
                        onChange={_this.filterCards}
                    />
                    <Sort
                        sortList={sortList}
                        sortBy={_this.sortBy}
                        translation={_this.props.translation}
                    />
                    <h1 className="u-inline-block">{_this.props.data.region_name}</h1>
                </div>
                <div className="pure-g">
                    {_this.state.cards.map(function(data, i) {
                        return (
                            <DistrictCard
                                key={i}
                                identifier={i}
                                data={data}
                                translation={_this.props.translation}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
});

export default BlockGroup;
