# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                 api_users POST   /api/users(.:format)                                                                     api/users#create {:default=>{:format=>:json}}
#               api_stories GET    /api/stories(.:format)                                                                   api/stories#index {:default=>{:format=>:json}}
#                           POST   /api/stories(.:format)                                                                   api/stories#create {:default=>{:format=>:json}}
#             new_api_story GET    /api/stories/new(.:format)                                                               api/stories#new {:default=>{:format=>:json}}
#            edit_api_story GET    /api/stories/:id/edit(.:format)                                                          api/stories#edit {:default=>{:format=>:json}}
#                 api_story GET    /api/stories/:id(.:format)                                                               api/stories#show {:default=>{:format=>:json}}
#                           PATCH  /api/stories/:id(.:format)                                                               api/stories#update {:default=>{:format=>:json}}
#                           PUT    /api/stories/:id(.:format)                                                               api/stories#update {:default=>{:format=>:json}}
#                           DELETE /api/stories/:id(.:format)                                                               api/stories#destroy {:default=>{:format=>:json}}
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"
  namespace :api, default:{format: :json} do
    resources :users, only: %i(create index)
    resources :stories
    resources :newsletters
    resource :publishing, only: %i(create destroy)
    resource :session, only: %i(create destroy)
  end
end
