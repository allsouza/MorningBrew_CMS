class AddTagToStories < ActiveRecord::Migration[5.2]
  def change
    add_column :stories, :tag, :string
  end
end
