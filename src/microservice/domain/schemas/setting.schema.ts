/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema({ timestamps: true, collection: 'settings' })
export class Setting {
  @Prop({ required: false })
  shop_id: string;

  @Prop({ required: false })
  enable: boolean;

  @Prop({ required: false })
  home_review_module: boolean;

  @Prop({ required: false })
  list_page_review_module: boolean;

  @Prop({ required: false })
  widget_layout: string;

  @Prop({ required: false })
  star_color: string;

  @Prop({ required: false })
  reviews_theme: string;

  @Prop({ required: false })
  custom_header_text: string;

  @Prop({ required: false })
  custom_reviews_text: string;

  @Prop({ required: false })
  reviews_widget_show: boolean;

  @Prop({ required: false })
  reviews_layout: number;

  @Prop({ required: false })
  review_show_option: string;

  @Prop({ required: false })
  reviews_widget_title: string;

  @Prop({ required: false })
  reviews_per_page: number;

  @Prop({ required: false })
  reviews_dates: boolean;

  @Prop({ required: false })
  default_sorting: number;

  @Prop({ required: false })
  show_sorting_options: boolean;

  @Prop({ required: false })
  enable_auto_intercept: boolean;

  @Prop({ required: false })
  auto_intercept_max_star: number;

  @Prop({ required: false })
  enable_notify_mail: boolean;

  @Prop({ required: false })
  notify_email: string;

  @Prop({ required: false })
  role_can_post: number;

  @Prop({ required: false })
  title_font_color: string;

  @Prop({ required: false })
  title_font_size: number;

  @Prop({ required: false })
  star_bg_color: string;

  @Prop({ required: false })
  star_widget_font_size: number;

  @Prop({ required: false })
  language: string;

  @Prop({ required: false })
  review_component: string;

  @Prop({ required: false })
  component_color: string;

  @Prop({ required: false })
  component_bg_color: string;

  @Prop({ required: false })
  score_icon: string;

  @Prop({ required: false })
  star_component_enable: boolean;

  @Prop({ required: false })
  featured_comments_widget_enable: boolean;

  @Prop({ required: false })
  featured_comments_widget_title: string;

  @Prop({ required: false })
  show_zero_reviews_enable: boolean;

  @Prop({ required: false })
  featured_comments_show_proportion: string;

  @Prop({ required: false })
  qa_widget_enable: boolean;

  @Prop({ required: false })
  qa_search_enable: boolean;

  @Prop({ required: false })
  qa_widget_title: string;

  @Prop({ required: false })
  qa_widget_per_page_question_count: number;

  @Prop({ required: false })
  qa_widget_display_content: string;

  @Prop({ required: false })
  qa_widget_commit_question_enable: boolean;

  @Prop({ required: false })
  qa_widget_default_sort_type: number;

  @Prop({ required: false })
  qa_widget_font_color: string;

  @Prop({ required: false })
  qa_widget_bg_color: string;

  @Prop({ required: false })
  featured_comment_side_widget_enable: boolean;

  @Prop({ required: false })
  featured_comment_side_widget_display_interval: number;

  @Prop({ required: false })
  featured_comment_side_widget_stay_interval: number;

  @Prop({ required: false })
  featured_comment_side_widget_display_location: number;

  @Prop({ required: false })
  featured_comment_side_widget_font_color: string;

  @Prop({ required: false })
  featured_comment_side_widget_bg_color: string;

  @Prop({ required: false })
  ins_carousel_widget_enable: boolean;

  @Prop({ required: false })
  ins_carousel_widget_title: string;

  @Prop({ required: false })
  ins_carousel_widget_title_position: number;
}

const schema = SchemaFactory.createForClass(Setting);
schema.index({ shop_id: 1, enviroment: 1 }, { unique: true });

export const SettingSchema = schema;
