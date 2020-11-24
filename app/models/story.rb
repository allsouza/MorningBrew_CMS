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
#  tag        :string
#
class Story < ApplicationRecord
    validates :title, :author_id, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :publishings,
        dependent: :destroy

    def createAPI
        resp = Faraday.post('https://lyra-api.herokuapp.com/api/stories') do |req|
            req.headers['Authorization'] = Figaro.env.lyra_key
            req.body = {html: self.html, title: self.title}
        end
        self.lyra_key = JSON.parse(resp.body)["data"]["id"]
        self.save!
    end

    def updateAPI
        resp = Faraday.patch("https://lyra-api.herokuapp.com/api/stories/#{self.lyra_key}") do |req|
            debugger
            req.headers['Authorization'] = Figaro.env.lyra_key
            req.body = {html: self.html, title: self.title}
        end
    end

    def deleteAPI
        resp = Faraday.delete("https://lyra-api.herokuapp.com/api/stories/#{self.lyra_key}") do |req|
            req.headers['Authorization'] = Figaro.env.lyra_key
        end
    end
end
