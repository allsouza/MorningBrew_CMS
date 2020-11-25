stories = newsletter.stories.map{|s| s.id.to_i}
order = newsletter.story_order.split(',').map { |story| story.to_i }.select{|ele| stories.include?(ele)} 

json.id newsletter.id
json.date newsletter.date
json.author_id newsletter.author_id
json.html newsletter.html
json.story_order order