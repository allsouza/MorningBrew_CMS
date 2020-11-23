# == Schema Information
#
# Table name: newsletters
#
#  id         :bigint           not null, primary key
#  date       :date             not null
#  html       :text             not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Newsletter < ApplicationRecord
    validates :date, :html, :author_id, presence: true

    has_many :publishings

    has_many :stories,
        through: :publishings,
        source: :story
end
