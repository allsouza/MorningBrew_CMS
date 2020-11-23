class Newsletter < ApplicationRecord
    validates :date, :html, :author_id, presence: true

    has_many :publishings

    has_many :stories,
        through: :publishings,
        source: :story
end
