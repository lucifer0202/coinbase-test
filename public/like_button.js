'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'products',
            list: [],
            trade: [],
            selectedProduct: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {

        fetch(`/api?path=${this.state.value}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    list: res
                })
            })
    }

    handleGetTrade(id) {
        this.setState({ selectedProduct: id })
        fetch(`/api?path=products/${id}/trades`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    trade: res
                })
            })
    }

    renderTrade = () => {

        if (this.state.trade[0]) {
            return (

                <table>
                    <tr key={"header"}>
                        {Object.keys(this.state.trade[0]).map((key) => (
                            <th>{key}</th>
                        ))}
                    </tr>
                    {this.state.trade.map((item) => (
                        <tr key={item.id}>
                            {Object.values(item).map((val) => (
                                <td>{val}</td>
                            ))}
                        </tr>
                    ))}
                </table>
            )
        }
        return null

    }

    render() {

        return (
            <div>
                <div >
                    <label>
                        Select API:
              <select value={this.state.value} onChange={this.handleChange}>
                            <option value="products">Products</option>
                        </select>
                    </label>
                    <input type="button" value="Submit" onClick={this.handleSubmit} />
                </div>
                {
                    this.state.selectedProduct && (
                        <div>
                            <div>Trade : {this.state.selectedProduct}</div>
                            {this.renderTrade()}
                        </div>
                    )
                }
                {
                    this.state.list[0] &&
                    <table>
                        <tr key={"header"}>
                            <th>Action</th>
                            {Object.keys(this.state.list[0]).map((key) => (
                                <th>{key}</th>
                            ))}
                        </tr>
                        {this.state.list.map((item) => (

                            <tr key={item.id}>
                                <td>
                                    <input type="button" value={'Get Trade'}
                                        onClick={() => this.handleGetTrade(item.id)} />
                                </td>

                                {Object.values(item).map((val) => (
                                    <td>{val}</td>
                                ))}

                            </tr>

                        ))}
                    </table>}

                <ul>
                    {/* {
                        this.state.list.map(item => {
                            return (
                                <li>
                                    <div>
                                        <span>Get Trade</span>
                                        <input type="button" value={item.display_name}
                                            onClick={() => this.handleGetTrade(item.id)} />
                                    </div>
                                    <div>
                                        {JSON.stringify(item)}
                                    </div>
                                </li>)
                        })
                    } */}
                </ul>
            </div>
        )
    }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);