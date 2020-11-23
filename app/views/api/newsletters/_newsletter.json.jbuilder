json.id newsletter.id
json.date newsletter.date
json.author_id newsletter.author_id
json.html newsletter.html + '<br>' + newsletter.stories.map{ |story| story.html }.join('\n <br><br>')
json.stories newsletter.stories.map { |story| story.id }