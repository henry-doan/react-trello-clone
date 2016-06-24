class ItemsController < ApplicationController
  before_action :find_list

  def index
  	render json: list.items
  end

  def create
  	item = list.items.new(item_params)
  	if item.save
  		render json: item
  	else
  		render json: { errors: item.errors.full_messages }
  	end
  end

  def update
  	item = Item.find(params[:id]);
 		if item.update(item_params)
 			render json: item
 		else
 			render json: { errors: item.errors.full_messages }
 		end
  end

  def destroy
  	list.items.find(params[:id]).destroy
  	render json: { message: 'item deleted'}
  end

  private
  # FIX CONTROLLER
  	def find_list
      List.find(params[:list_id])
    end

  	def item_params
  		params.require(:item).permit(:name, :info)
  	end
end
