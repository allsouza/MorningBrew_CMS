class ChangeNewsletter < ActiveRecord::Migration[5.2]
  def change
    create_table :publishing do |t|
      t.references :story, index: true, foreign_key: true
      t.references :newsletter, index: true, foreign_key: true

      t.timestamps
    end
  end
end
