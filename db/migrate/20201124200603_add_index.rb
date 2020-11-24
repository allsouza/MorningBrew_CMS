class AddIndex < ActiveRecord::Migration[5.2]
  def change
    add_index :stories, :lyra_key
    add_index :newsletters, :lyra_key
  end
end
