json.extract! :id, :date, :html
json.stories newsletter.stories.map { |story| story.id }