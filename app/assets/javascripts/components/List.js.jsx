class List extends React.Component {
    constructor(props) {
     	super(props);
     	this.state = { items: [], edit: false };
      this.toggleEdit = this.toggleEdit.bind(this);
    	this.updateList = this.updateList.bind(this);
    }

    componentWillMount() {
        // TODO make and ajax call to grab all the lists items
        // on success - set state on all the items
    }

   	toggleEdit() {
  		this.setState({ edit: !this.state.edit });
  	}

  	updateList(){
  		let list= { name: this.refs.name.value }
  		this.toggleEdit();
  		this.props.updatelist(this.props.id, list);
  	}

  	edit() {
  		return(
  			<div>
        	<input placeholder={this.props.name} defaultValue={this.props.name} ref="name" require />
        	<button onClick={this.toggleEdit} className="btn yellow">Cancel</button>
    	    <button onClick={this.updateList} className="btn">Save</button>
        	<hr />
        </div>
  		)
  	}

    render() {
    	let items = this.state.items.map( item => {
    		// this should be a new compmonent
    		return(<h3>{item.name}</h3>);
    	});

    	if (this.state.edit)
      	return this.edit();
   		else
        return(
        	<div>
        		<h3>{this.props.name}</h3>
        		<button onClick={this.toggleEdit} className='btn'>Edit</button>
        		<button className='btn red' onClick={() => this.props.deleteList(this.props.id)}>Delete</button>
        		<hr />
        		{items}
        	</div>
       );
    }
}