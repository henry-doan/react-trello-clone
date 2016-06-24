class NewItem extends React.Component {
  constructor(props) {
      super(props);
  }

  addItem(e) {
    e.preventDefault();
    $.ajax({
      url: `/items`,
      type: 'POST',
      data: { item: { name: this.refs.name.value, info: this.refs.info.value } },
      dataType: 'JSON'
    }).done( item => {
      this.props.addItem(item);
      this.refs.addItem.reset();
    }).fail( data => {
      alert('Failed to add item');
    })
  }
  render() {
    return(
      <div className="col s12 m10 offset-m1">
        <h4>Add New Item</h4>
        <form onSubmit={this.addItem.bind(this)} ref='addItem'>
          <input type="text" ref="name" placeholder="Item Name" required />
   				<input type="text" ref="info" placeholder="Item Info" />
          <input type='submit' className='btn' value='Add' />
        </form>
      </div>
    )
  }
}
