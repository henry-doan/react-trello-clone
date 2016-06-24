class List extends React.Component {
    constructor(props) {
     	super(props);
     	this.state = { items: props.items, edit: false };
      this.toggleEdit = this.toggleEdit.bind(this);
    	this.updateList = this.updateList.bind(this);
    }

   	toggleEdit() {
  		this.setState({ edit: !this.state.edit });
  	}

  	updateList(){
  		let list= { name: this.refs.name.value }
  		this.toggleEdit();
  		this.props.updateList(this.props.id, list);
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

    	if (this.state.edit)
      	return this.edit();
   		else
        return(
        	 <div>
        	  <div className="col s12 m6">
        	    <div className="card black darken-1">
        	      <div className="card-content white-text" onClick={() => this.props.showList(this.props)}>
        	        <span className="card-title">{this.props.name}</span>
        	      </div>
        	      <div className="card-action">
        	        <button onClick={this.toggleEdit} className='btn'>Edit</button>
									<button className='btn red' onClick={() => this.props.deleteList(this.props.id)}>Delete</button>        	      </div>
        	    </div>
        	  </div>
        	</div>
       );
    }
}