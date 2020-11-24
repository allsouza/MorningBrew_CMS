# == Schema Information
#
# Table name: newsletters
#
#  id          :bigint           not null, primary key
#  date        :date             not null
#  html        :text             not null
#  author_id   :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  story_order :string
#
class Newsletter < ApplicationRecord
    validates :date, :html, :author_id, presence: true

    has_many :publishings,
        dependent: :destroy

    has_many :stories,
        through: :publishings,
        source: :story
end
