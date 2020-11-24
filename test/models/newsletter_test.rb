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
require 'test_helper'

class NewsletterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
