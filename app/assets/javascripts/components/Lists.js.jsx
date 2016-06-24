class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.state = { lists: [], show: false };
		this.deleteList = this.deleteList.bind(this);
		this.updateList = this.updateList.bind(this);
		this.showList = this.showList.bind(this);
    this.listBack = this.listBack.bind(this);
	}

	componentWillMount() {
		$.ajax({
			url: `/boards/${this.props.boardId}/lists`,
			type: 'GET',
			dataType: 'JSON'
		}).done( lists => {
			this.setState({ lists });
		}).fail( data => {
			alert('Failed grabbing board lists.');
		});
	}

	updateList(id, list) {
		$.ajax({
			url: `/boards/${this.props.boardId}/lists/${id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { list: {...list} }
		}).done( list => {
			let lists = this.state.lists;
			let editList = lists.find( b => b.id === list.id);
			editList.name =list.name;
			this.setState({lists: lists});
		}).fail( data => {
			alert('list is not updated')
		})
	}

	deleteList(id) {
		$.ajax({
			url: `/boards/${this.props.boardId}/lists/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let lists = this.state.lists;
			let index = lists.findIndex( l => l.id === id);
			this.setState({
				lists: [ ...lists.slice(0, index), ...lists.slice(index + 1, lists.length) ]
			})
		}).fail( data => {
			// TODO: handle this better
			alert('list not deleted!');
		});
	}

	addList(e) {
		e.preventDefault();
		$.ajax({
			url: `/boards/${this.props.boardId}/lists`,
			type: 'POST',
			data: { list: { name: this.refs.name.value } },
			dataType: 'JSON'
		}).done( list => {
			this.refs.addList.reset();
			this.setState({ lists: [{...list}, ...this.state.lists ] });
		}).fail( data => {
			// TODO: Handle this better
			alert('List not saved.');
		});
	}

	showList(list) {
    this.setState({ show: true, list})
  }

  listBack() {
    this.setState({ show: false })
  }


	render() {
		let lists = this.state.lists.map( list => {
					return(<List key={`list-${list.id}`} {...list} deleteList={this.deleteList} updateList={this.updateList} showList={this.showList}/>);
		});

		if(this.state.show) {
			let list = this.state.list;
			return(
				<div>
				//     ?
					<h2>list.name</h2>
					<hr />
					<button className='btn' onClick={this.listBack.bind(this)}>Back To All List</button>
					<Items listId={this.state.list.id} />
				</div>
			)
		} else {
				return(
					<div>
						<NewList boardId={this.props.boardId} addList={this.addList.bind(this)}/>
						<br />
						<div className="row">
						  {lists}
						</div>
					</div>
				);
		} //else
	} //render
} //class
