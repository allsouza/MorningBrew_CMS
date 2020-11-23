# == Schema Information
#
# Table name: publishings
#
#  id            :bigint           not null, primary key
#  story_id      :bigint
#  newsletter_id :bigint
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Publishing < ApplicationRecord
    validates :story, uniqueness: { scope: :newsletter }

    belongs_to :story
    belongs_to :newsletter
end
