json.id newsletter.id
json.date newsletter.date
json.author_id newsletter.author_id
json.html newsletter.html
# json.stories newsletter.stories.map { |story| story.id }
json.story_order newsletter.story_order.split(',').map { |story| story.to_i }