class AddStoryOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :newsletters, :story_order, :string
  end
end
