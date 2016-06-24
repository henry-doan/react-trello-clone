class Items extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [] };
		this.deleteItem = this.deleteItem.bind(this);
		this.updateItem = this.updateItem.bind(this);
	}

	 componentWillMount() {
        $.ajax({
        	url: `/items`,
        	type: 'GET',
        	dataType: 'JSON',
        }).done( items => {
        	this.setState({ items})
        }).fail( data => {
        	alert('componentWillMount')
        })
    }

    updateItem(id, item){
    	$.ajax({
    		url: `/items/${id}`,
        type: 'PUT',
        dataType: 'JSON',
        data: { item: {...item} }
      }).done( item => {
        let items = this.state.items;
        let editItem = items.find( I => I.id  === item.id);
        editItem.name = item.name;
        this.setState({items: items})
    	}).fail( data => {
    		alert('item is not updated')
    	})
    }

    deleteItem(id) {
    	$.ajax({
    		url: `/items/${id}`,
    		type: 'DELETE',
    		dataType: 'JSON',
    	}).done( data => {
    		let items = this.state.items;
    		let index = items.findIndex( I => I.id  === item.id)
    		this.setState({
    			items: [ ...items.slice(0, index), ...items.slice(index + 1, items.length) ]
    		})
    	}).fail( data => {
    		alert('Item not deleted')
    	})
    }

   	addItem(e) {
    	e.preventDefault();
    	let name = this.refs.name;
    	let info = this.refs.info;
    	$.ajax({
    		url: `/items`,
    		type: 'POST',
    		dataType: 'JSON',
    		data: { list_id: this.props.id, item: { name: name.value, info: info.value }},
    	}).done( item => {
    		this.refs.addItem.reset();
    		this.setState({ items: [item, ...this.state.items ] });
    	}).fail( data => {
    		alert('failed to add items')
    	});
    }



   render() {
   	let items = this.state.items.map( item => {
   		return(<Item key={`item-${item.id}`} {...item} deleteItem={this.deleteItem} updateItem={this.updateItem} showItem={this.showItem}/>);
   	});

   	return(
   		<div>
   			<NewItem listId={this.props.listId} addItem={this.addItem.bind(this)} />
   			<div className="row">
   				{items}
   			</div>
			</div>
   	);
   }
}