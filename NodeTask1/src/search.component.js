import React from 'react';

export default class Search extends React.Component {
    render() {
        const addTextMask = this.props.addTextMask,
            state = this.props.reduxState;

        let mask;

        return (
            <div className='search__wrapper'>
                <input className='search__input' placeholder='Enter author name...'
                    ref={node => {
                        mask = node;
                    }}
                />
                <button className='search__button' onClick={() => {
                    addTextMask(mask.value);
                }}>Search</button>
            </div>
        );
    }
}
