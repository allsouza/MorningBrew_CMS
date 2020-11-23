class Publishing < ApplicationRecord
    validates :story, uniqueness: { scope: :newsletter }

    belongs_to :story
    belongs_to :newsletter
end