class CreateNewsletters < ActiveRecord::Migration[5.2]
  def change
    create_table :newsletters do |t|
      t.date :date, null: false
      t.text :html, null: false
      t.integer :author_id, null: false

      t.timestamps
    end

    add_index :newsletters, :author_id
  end
end
