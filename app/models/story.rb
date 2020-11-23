# == Schema Information
#
# Table name: stories
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  html       :text             not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Story < ApplicationRecord
    validates :title, :html, :author_id, :tag, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :publishings
end
