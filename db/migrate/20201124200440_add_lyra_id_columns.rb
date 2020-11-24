class AddLyraIdColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :stories, :lyra_key, :string, index: true
    add_column :newsletters, :lyra_key, :string, index: true
  end
end
