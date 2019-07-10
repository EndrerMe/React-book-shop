// Vendors
import React from "react"

// Style
import "./shoppingBag.scss"

interface IShoppingBag {
    showText: boolean,
    bag: []
}

export default class ShoppingBag extends React.Component<{} ,IShoppingBag> {
    constructor(
        props: {}
        ) {
        super(props);
        this.state = {
            showText: false,
            bag: [] as any,
        };
    };

    componentDidMount() {
        this.setState({
            bag: JSON.parse(localStorage.getItem("bag") as any),
        });

        if(JSON.parse(localStorage.getItem("bag") as any)) {
            this.setState({
                showText: false,
            });
        };

        if(!JSON.parse(localStorage.getItem("bag") as any)) {
            this.setState({
                showText: true,
            });
        };

        
    };

    private clearBag(): void {
        localStorage.removeItem("bag");
        this.setState({
            showText: true,
            bag: [],
        });
    };

    handleChange(event: any): void {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    };

    public render() {
        return(
            <section className="bag">
            <h2 className="bag__title">Корзина</h2>
            {
                this.state.showText ?
                <h4 >Ваша коризна пуста, перейти в <a href="/all-books">каталог</a>?</h4>
                : null
            }
            {
                !this.state.showText ?
                <div className="bag__catalog">
                {this.state.bag.map((book: any) => {
                    return(
                        <div className="bagBook" key={book.idbooks}>
                        <h3 className="book__title">{ book.title }</h3>
                        <p className="book__info">{ book.description }</p>
                        <p className="book__price">Цена: { +book.price * book.value }$</p>
                        <div>
                            <span>Количество:</span>
                            <input className="quantity" 
                            name="value"
                            onChange={this.handleChange}
                            type="number" value={book.value} />
                        </div>
                    </div>
                    );
                })}
            </div> :
            null
            }
            {
                this.state.showText ?
                null
                : 
                <div className="bag__clear">
                    <button onClick={() => this.clearBag()}>Очистить корзину</button>
                </div>
            }
        </section>
        );
    }
}