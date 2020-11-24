class AddBody < ActiveRecord::Migration[5.2]
  def change
    add_column :stories, :body, :text
    change_column :stories, :html, :text, null: true
  end
end
