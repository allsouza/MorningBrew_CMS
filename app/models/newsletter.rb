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

    def createAPI
        resp = Faraday.post('https://lyra-api.herokuapp.com/api/newsletters') do |req|
            req.headers['Authorization'] = Figaro.env.lyra_key
            req.body = {html: self.html, date: self.date}
        end
        self.lyra_key = JSON.parse(resp.body)["data"]["id"]
        self.save!
    end

    def updateAPI
        resp = Faraday.patch("https://lyra-api.herokuapp.com/api/newsletters/#{self.lyra_key}") do |req|
            req.headers['Authorization'] = Figaro.env.lyra_key
            req.body = {html: self.html, date: self.date}
        end
    end

    def deleteAPI
        resp = Faraday.delete("https://lyra-api.herokuapp.com/api/newsletters/#{self.lyra_key}") do |req|
            req.headers['Authorization'] = Figaro.env.lyra_key
        end
    end
end
