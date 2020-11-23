json.array! @newsletters do |newsletter|
    json.partial! 'api/newsletters/newsletter', newsletter: newsletter
end