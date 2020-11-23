class ChangeHtmlColumnToText < ActiveRecord::Migration[5.2]
  def change
    change_column :stories, :html, :text
  end
end
