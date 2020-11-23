class FixPublishingsTableName < ActiveRecord::Migration[5.2]
  def change
    rename_table :publishing, :publishings
  end
end
