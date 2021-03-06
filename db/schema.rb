# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_24_223343) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "newsletters", force: :cascade do |t|
    t.date "date", null: false
    t.text "html", null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "story_order"
    t.string "lyra_key"
    t.index ["author_id"], name: "index_newsletters_on_author_id"
    t.index ["lyra_key"], name: "index_newsletters_on_lyra_key"
  end

  create_table "publishings", force: :cascade do |t|
    t.bigint "story_id"
    t.bigint "newsletter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["newsletter_id"], name: "index_publishings_on_newsletter_id"
    t.index ["story_id"], name: "index_publishings_on_story_id"
  end

  create_table "stories", force: :cascade do |t|
    t.string "title", null: false
    t.text "html"
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "tag"
    t.string "lyra_key"
    t.text "body"
    t.index ["author_id"], name: "index_stories_on_author_id"
    t.index ["lyra_key"], name: "index_stories_on_lyra_key"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
  end

  add_foreign_key "publishings", "newsletters"
  add_foreign_key "publishings", "stories"
end
