import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../css/pages/index.css';

export default class Index extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {auth: props.auth};

    }

    render() {
        return (
            <div id='index_content'>
                <p>
                    lorom ipsum dolor sit amet,
                    consectetur adipiscing elit. Quisque dolor dui,
                    facilisis ut ante in, tristique sodales risus. Aenean a
                    tristique erat. Quisque ultricies facilisis urna sit amet
                    volutpat. Pellentesque faucibus pulvinar mauris vel
                    vulputate. Cum sociis natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Curabitur sed
                    lacus purus. Integer vitae purus pulvinar, mattis nibh
                    vitae, imperdiet nulla. Maecenas sit amet mauris ac erat
                    vulputate posuere.
                </p>
                <p>
                    Sed vitae massa rutrum, aliquet nisl sed, laoreet lacus. Sed
                    interdum lectus vel sapien fermentum, et ornare arcu
                    pulvinar. Ut lobortis quam egestas, pellentesque quam non,
                    scelerisque urna. Morbi tellus lorem, rutrum eu mattis nec,
                    sodales sit amet tellus. Nullam id nisi euismod, tincidunt
                    ex vitae, finibus erat. Donec fermentum mi ac dolor pharetra
                    finibus. Suspendisse venenatis condimentum odio, eu
                    consectetur magna rutrum et. Cras imperdiet neque dui,
                    sed....
                </p>
                <div id='links'>
                    <span>
                        <Link to='/login'>
                            <button type='button' className='btn btn-light'>
                                Login
                            </button>
                        </Link>
                    </span>
                    <span>
                        <Link to='/register'>
                            <button type='button' className='btn btn-light'>
                                Register
                            </button>
                        </Link>
                    </span>
                </div>
            </div>
        );
    }

}