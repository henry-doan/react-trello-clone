class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  updateItem(){
    let item = { name: this.refs.name.value, info: this.refs.info.value }
    this.toggleEdit();
    this.props.updateItem(this.props.id, item);
  }

  render() {
    if (this.state.edit) 
      return this.edit();
    else 
  	  return (
        <div>
          <div className="col s12 m6">
            <div className="card grey darken-1">
              <div className="card-content white-text">
                <span className="card-title" key={`item-${item.id}`}>{this.props.name}</span>
                <p>{this.props.info}</p>
              </div>
              <div className="card-action">
                <button onClick={this.toggleEdit} className='btn'>Edit</button>
                <button className='btn red' onClick={() => this.props.deleteItem(this.props.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
    	);
  }
}
